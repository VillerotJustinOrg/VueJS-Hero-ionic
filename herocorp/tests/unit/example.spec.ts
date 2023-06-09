import { mount } from '@vue/test-utils'
import Tab1Page from '../../src/views/ProfileView.vue'
import { describe, expect, test } from 'vitest'

describe('ProfileView.vue', () => {
  test('renders tab 1 Tab1Page', () => {
    const wrapper = mount(Tab1Page)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})
